import { execSync } from "child_process";

// 数据库名
const DATABASE_NAME = "next-saas-demo";
// 操作本地还是生产库: local 本地, remote 远程
const DB_TYPE: string = "local";
// 执行的sql文件数组，按顺序执行
const SQL_FILES = [
  // 查询所有表
  "src/db/sql/show-tables.sql",
];

/* 操作本地数据库 */
const executeLocalSQL = (sqlFile: string) => {
  const command = `wrangler d1 execute ${DATABASE_NAME} --local --file ${sqlFile}`;
  const result = execSync(command, { encoding: "utf8" });
  return result;
};

/* 操作远程数据库 */
const executeRemoteSQL = (sqlFile: string) => {
  const command = `wrangler d1 execute ${DATABASE_NAME} --remote --file ${sqlFile}`;
  const result = execSync(command, { encoding: "utf8" });
  return result;
};

/* 执行操作 */
const main = () => {
  console.log(`开始执行 ${SQL_FILES.length} 个SQL文件...`);

  SQL_FILES.forEach((sqlFile, index) => {
    console.log(`[${index + 1}/${SQL_FILES.length}] 执行: ${sqlFile}`);

    try {
      let result: any = "";
      // 显示从操作日志
      if (DB_TYPE === "local") {
        result = executeLocalSQL(sqlFile);
      } else {
        result = executeRemoteSQL(sqlFile);
      }
      console.log(`✓ ${sqlFile} 执行成功，结果：${result}`);
    } catch (error) {
      console.error(`✗ ${sqlFile} 执行失败:`, error);
      process.exit(1);
    }
  });

  console.log("所有SQL文件执行完成");
};

main();
