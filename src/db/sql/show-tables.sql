-- 查询当前数据库中的所有表
-- SQLite 系统表查询
SELECT name as table_name 
FROM sqlite_master 
WHERE type='table' 
ORDER BY name;
