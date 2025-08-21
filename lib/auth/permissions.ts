import { createAccessControl } from 'better-auth/plugins/access';

const statement = {
  project: ['create', 'share', 'update', 'delete'],
} as const;

const ac = createAccessControl(statement);

const member = ac.newRole({
  project: ['create'],
});

const administrator = ac.newRole({
  project: ['create', 'update'],
});

const owner = ac.newRole({
  project: ['create', 'update', 'delete'],
});

export { ac, member, administrator, owner, statement };
