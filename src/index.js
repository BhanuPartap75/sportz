import { eq } from 'drizzle-orm';
import { db, pool } from './db/db.js';
import { demoUsers } from './db/schema.js';

async function main() {
  try {
    console.log('Performing CRUD operations...');

    // CREATE: Insert a new user
    const inserted = await db
      .insert(demoUsers)
      .values({ name: 'Admin User', email: 'admin@example.com' })
      .returning();

    const newUser = inserted[0];
    if (!newUser) {
      throw new Error('Failed to create user');
    }

    console.log('✅ CREATE: New user created:', newUser);

    // READ: Select the user
    const found = await db.select().from(demoUsers).where(eq(demoUsers.id, newUser.id));
    console.log('✅ READ: Found user:', found[0]);

    // UPDATE: Change the user's name
    const updated = await db
      .update(demoUsers)
      .set({ name: 'Super Admin' })
      .where(eq(demoUsers.id, newUser.id))
      .returning();

    const updatedUser = updated[0];
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    console.log('✅ UPDATE: User updated:', updatedUser);

    // DELETE: Remove the user
    await db.delete(demoUsers).where(eq(demoUsers.id, newUser.id));
    console.log('✅ DELETE: User deleted.');

    console.log('\nCRUD operations completed successfully.');
  } catch (error) {
    console.error('❌ Error performing CRUD operations:', error);
    process.exitCode = 1;
  } finally {
    // If the pool exists, end it to close the connection
    if (pool && pool.end) {
      await pool.end();
      console.log('Database pool closed.');
    }
  }
}

main();
