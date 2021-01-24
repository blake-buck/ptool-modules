CREATE TABLE IF NOT EXISTS permission(name TEXT PRIMARY KEY, description TEXT) ;
INSERT OR REPLACE INTO permission VALUES('PERMISSION_READ', 'Grants user ability to get permissions');
INSERT OR REPLACE INTO permission VALUES('PERMISSION_WRITE', 'Grants user ability to post permissions');
INSERT OR REPLACE INTO permission VALUES('PERMISSION_UPDATE', 'Grants user ability to put/patch permissions');
INSERT OR REPLACE INTO permission VALUES('PERMISSION_DELETE', 'Grants user ability to delete permissions');

INSERT OR REPLACE INTO permission VALUES('GROUP_READ', 'Grants user ability to get groups');
INSERT OR REPLACE INTO permission VALUES('GROUP_WRITE', 'Grants user ability to post groups');
INSERT OR REPLACE INTO permission VALUES('GROUP_UPDATE', 'Grants user ability to put/patch groups');
INSERT OR REPLACE INTO permission VALUES('GROUP_DELETE', 'Grants user ability to delete groups');

INSERT OR REPLACE INTO permission VALUES('GROUP_TO_PERMISSION_READ', 'Grants user ability to get group to permission links');
INSERT OR REPLACE INTO permission VALUES('GROUP_TO_PERMISSION_WRITE', 'Grants user ability to post group to permission links');
INSERT OR REPLACE INTO permission VALUES('GROUP_TO_PERMISSION_UPDATE', 'Grants user ability to put/patch group to permission links');
INSERT OR REPLACE INTO permission VALUES('GROUP_TO_PERMISSION_DELETE', 'Grants user ability to delete group to permission links');

INSERT OR REPLACE INTO permission VALUES('GROUP_TO_USER_READ', 'Grants user ability to get group to user links');
INSERT OR REPLACE INTO permission VALUES('GROUP_TO_USER_WRITE', 'Grants user ability to post group to user links');
INSERT OR REPLACE INTO permission VALUES('GROUP_TO_USER_UPDATE', 'Grants user ability to put/patch group to user links');
INSERT OR REPLACE INTO permission VALUES('GROUP_TO_USER_DELETE', 'Grants user ability to delete group to user links');

CREATE TABLE IF NOT EXISTS group(id INTEGER PRIMARY KEY, name TEXT, description TEXT);
INSERT OR REPLACE INTO group VALUES(1, 'root', 'Permission to do everything. The key that unlocks all doors.');


CREATE TABLE IF NOT EXISTS groupToUser(
    id INTEGER PRIMARY KEY, 
    userId TEXT,  
    groupId groupId,
    FOREIGN KEY(groupId), REFERENCES group(id)
);

CREATE TABLE IF NOT EXISTS groupToPermission(
    id INTEGER PRIMARY KEY,
    groupId INTEGER,
    permissionId INTEGER,
    FOREIGN KEY(groupId) REFERENCES group(id),
    FOREIGN KEY(permissionId) REFERENCES permission(id)
);
INSERT OR REPLACE INTO groupToPermission(1, 1, 'PERMISSION_READ');
INSERT OR REPLACE INTO groupToPermission VALUES(2, 1, 'PERMISSION_WRITE');
INSERT OR REPLACE INTO groupToPermission VALUES(3, 1, 'PERMISSION_UPDATE');
INSERT OR REPLACE INTO groupToPermission VALUES(4, 1, 'PERMISSION_DELETE');

INSERT OR REPLACE INTO groupToPermission VALUES(5, 1, 'GROUP_READ');
INSERT OR REPLACE INTO groupToPermission VALUES(6, 1, 'GROUP_WRITE');
INSERT OR REPLACE INTO groupToPermission VALUES(7, 1, 'GROUP_UPDATE');
INSERT OR REPLACE INTO groupToPermission VALUES(8, 1, 'GROUP_DELETE');

INSERT OR REPLACE INTO groupToPermission VALUES(9, 1, 'GROUP_TO_PERMISSION_READ');
INSERT OR REPLACE INTO groupToPermission VALUES(10, 1, 'GROUP_TO_PERMISSION_WRITE');
INSERT OR REPLACE INTO groupToPermission VALUES(11, 1, 'GROUP_TO_PERMISSION_UPDATE');
INSERT OR REPLACE INTO groupToPermission VALUES(12, 1, 'GROUP_TO_PERMISSION_DELETE');

INSERT OR REPLACE INTO groupToPermission VALUES(13, 1, 'GROUP_TO_USER_READ');
INSERT OR REPLACE INTO groupToPermission VALUES(14, 1, 'GROUP_TO_USER_WRITE');
INSERT OR REPLACE INTO groupToPermission VALUES(15, 1, 'GROUP_TO_USER_UPDATE');
INSERT OR REPLACE INTO groupToPermission VALUES(16, 1, 'GROUP_TO_USER_DELETE');