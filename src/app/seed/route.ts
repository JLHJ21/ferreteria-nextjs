import connectionPool from "../../../db";
import bcryptjs from "bcryptjs";

const seedUser = async () => {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS public.user(
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_name VARCHAR(255) NOT NULL,
      user_username VARCHAR(255) NOT NULL,
      user_email TEXT NOT NULL UNIQUE,
      user_password TEXT NOT NULL
    );
  `);

  const users = [
    {
      id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
      name: "John",
      username: "john_doe",
      email: "jonh@yahoo.com",
      password: "123456",
    },
  ];

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcryptjs.hash(user.username, 10);
      return connectionPool.query(`
        INSERT INTO public.user (user_id,user_name, user_username, user_email, user_password)
        VALUES ('${user.id}', '${user.name}', '${user.username}', '${user.email}', '${hashedPassword}')
        ON CONFLICT (user_id) DO NOTHING;
      `);
    })
  );

  return insertedUsers;
};

const seedUserData = async () => {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS user_data (
      user_data_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL ,
      role_id INTEGER NOT NULL ,
      state_id INTEGER NOT NULL ,

      constraint fk_user
        foreign key (user_id) 
        REFERENCES public.user(user_id),

      constraint fk_role
        foreign key (role_id) 
        REFERENCES role(role_id),

      constraint fk_state
        foreign key (state_id) 
        REFERENCES state(state_id)
    );
  `);

  const usersData = [
    {
      userId: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
      roleId: 1,
      stateId: 1,
    },
  ];

  const insertedUsersData = await Promise.all(
    usersData.map(async (user) => {
      return connectionPool.query(`
        INSERT INTO user_data (user_id, role_id, state_id)
        VALUES ('${user.userId}', '${user.roleId}', '${user.stateId}')
        ON CONFLICT (user_data_id) DO NOTHING;
      `);
    })
  );

  return insertedUsersData;
};

const seedRole = async () => {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS role (
      role_id SERIAL PRIMARY KEY,
      role_name VARCHAR(255) NOT NULL
    );
  `);

  const rolsData = [
    {
      roleId: 1,
      roleName: "User",
    },
    {
      roleId: 2,
      roleName: "Administrator",
    },
  ];

  const insertedRoles = await Promise.all(
    rolsData.map(async (rol) => {
      return connectionPool.query(`
        INSERT INTO role (role_id, role_name)
        VALUES ('${rol.roleId}', '${rol.roleName}')
        ON CONFLICT (role_id) DO NOTHING;
      `);
    })
  );

  return insertedRoles;
};

const seedState = async () => {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS state (
      state_id SERIAL PRIMARY KEY,
      state_name VARCHAR(255) NOT NULL
    );
  `);

  const statesData = [
    {
      stateId: 1,
      stateName: "Active",
    },
    {
      stateId: 2,
      stateName: "Not active",
    },
    {
      stateId: 3,
      stateName: "Not verified",
    },
  ];

  const insertedStates = await Promise.all(
    statesData.map(async (state) => {
      return connectionPool.query(`
        INSERT INTO state (state_id, state_name)
        VALUES ('${state.stateId}', '${state.stateName}')
        ON CONFLICT (state_id) DO NOTHING;
      `);
    })
  );

  return insertedStates;
};

export async function GET() {
  try {
    await seedRole();
    await seedState();
    await seedUser();
    await seedUserData();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
