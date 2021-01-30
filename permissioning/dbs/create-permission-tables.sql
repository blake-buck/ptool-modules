CREATE TABLE IF NOT EXISTS permission(id INTEGER PRIMARY KEY ASC, name TEXT UNIQUE, description TEXT);

INSERT OR REPLACE INTO permission VALUES(1, 'PERMISSION_GET', 'Grants user ability to get permissions');
INSERT OR REPLACE INTO permission VALUES(2, 'PERMISSION_POST', 'Grants user ability to post permissions');
INSERT OR REPLACE INTO permission VALUES(3, 'PERMISSION_MODIFY', 'Grants user ability to put/patch permissions');
INSERT OR REPLACE INTO permission VALUES(4, 'PERMISSION_DELETE', 'Grants user ability to delete permissions');

INSERT OR REPLACE INTO permission VALUES(5, 'PERMISSION_GROUP_GET', 'Grants user ability to get groups');
INSERT OR REPLACE INTO permission VALUES(6, 'PERMISSION_GROUP_POST', 'Grants user ability to post groups');
INSERT OR REPLACE INTO permission VALUES(7, 'PERMISSION_GROUP_MODIFY', 'Grants user ability to put/patch groups');
INSERT OR REPLACE INTO permission VALUES(8, 'PERMISSION_GROUP_DELETE', 'Grants user ability to delete groups');

INSERT OR REPLACE INTO permission VALUES(9, 'PERMISSION_GROUP_TO_PERMISSION_GET', 'Grants user ability to get group to permission links');
INSERT OR REPLACE INTO permission VALUES(10, 'PERMISSION_GROUP_TO_PERMISSION_POST', 'Grants user ability to post group to permission links');
INSERT OR REPLACE INTO permission VALUES(11, 'PERMISSION_GROUP_TO_PERMISSION_MODIFY', 'Grants user ability to put/patch group to permission links');
INSERT OR REPLACE INTO permission VALUES(12, 'PERMISSION_GROUP_TO_PERMISSION_DELETE', 'Grants user ability to delete group to permission links');

INSERT OR REPLACE INTO permission VALUES(13, 'PERMISSION_GROUP_TO_USER_GET', 'Grants user ability to get group to user links');
INSERT OR REPLACE INTO permission VALUES(14, 'PERMISSION_GROUP_TO_USER_POST', 'Grants user ability to post group to user links');
INSERT OR REPLACE INTO permission VALUES(15, 'PERMISSION_GROUP_TO_USER_MODIFY', 'Grants user ability to put/patch group to user links');
INSERT OR REPLACE INTO permission VALUES(16, 'PERMISSION_GROUP_TO_USER_DELETE', 'Grants user ability to delete group to user links');

INSERT OR REPLACE INTO permission VALUES(17, 'RECORD_LEVEL_PERMISSION_GET', 'Grants user ability to get record level permissions');
INSERT OR REPLACE INTO permission VALUES(18, 'RECORD_LEVEL_PERMISSION_POST', 'Grants user ability to post record level permissions');
INSERT OR REPLACE INTO permission VALUES(19, 'RECORD_LEVEL_PERMISSION_MODIFY', 'Grants user ability to put/patch record level permissions');
INSERT OR REPLACE INTO permission VALUES(20, 'RECORD_LEVEL_PERMISSION_DELETE', 'Grants user ability to delete record level permissions');

INSERT OR REPLACE INTO permission VALUES(21, 'GROUP_LEVEL_PERMISSION_GET', 'Grants user ability to get group level permissions');
INSERT OR REPLACE INTO permission VALUES(22, 'GROUP_LEVEL_PERMISSION_POST', 'Grants user ability to post group level permissions');
INSERT OR REPLACE INTO permission VALUES(23, 'GROUP_LEVEL_PERMISSION_MODIFY', 'Grants user ability to put/patch group level permissions');
INSERT OR REPLACE INTO permission VALUES(24, 'GROUP_LEVEL_PERMISSION_DELETE', 'Grants user ability to delete group level permissions');

CREATE TABLE IF NOT EXISTS permissionGroup(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
INSERT OR REPLACE INTO permissionGroup VALUES(1, 'root', 'Permission to do everything. The key that unlocks all doors.');

CREATE TABLE IF NOT EXISTS permissionGroupToUser(
    id INTEGER PRIMARY KEY, 
    userId TEXT,  
    groupId INTEGER,
    FOREIGN KEY(groupId) REFERENCES permissionGroup(id)
);

INSERT OR REPLACE INTO permissionGroupToUser VALUES (1, 'abc-root', 1);

CREATE TABLE IF NOT EXISTS permissionGroupToPermission(
    id INTEGER PRIMARY KEY,
    groupId INTEGER,
    permissionId INTEGER,
    FOREIGN KEY(groupId) REFERENCES permissionGroup(id),
    FOREIGN KEY(permissionId) REFERENCES permission(id)
);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES (1, 1, 1);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(2, 1, 2);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(3, 1, 3);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(4, 1, 4);

INSERT OR REPLACE INTO permissionGroupToPermission VALUES(5, 1, 5);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(6, 1, 6);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(7, 1, 7);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(8, 1, 8);

INSERT OR REPLACE INTO permissionGroupToPermission VALUES(9, 1, 9);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(10, 1, 10);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(11, 1, 11);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(12, 1, 12);

INSERT OR REPLACE INTO permissionGroupToPermission VALUES(13, 1, 13);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(14, 1, 14);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(15, 1, 15);
INSERT OR REPLACE INTO permissionGroupToPermission VALUES(16, 1, 16);

CREATE TABLE IF NOT EXISTS recordLevelPermission(
    id INTEGER PRIMARY KEY,
    tableName TEXT, 
    recordId INTEGER, 
    permissionType TEXT, 
    granteeId TEXT, 
    get INTEGER, 
    modify INTEGER, 
    del INTEGER
);

CREATE TABLE IF NOT EXISTS groupLevelPermission(
    id INTEGER PRIMARY KEY,
    tableName TEXT, 
    recordId INTEGER, 
    groupId INTEGER,
    permissionType TEXT, 
    granteeId TEXT, 
    get INTEGER, 
    post INTEGER
);