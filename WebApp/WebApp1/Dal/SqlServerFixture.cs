using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using Dapper;
using DapperExtensions.Sql;

namespace WebApp1.Dal
{
    public class SqlServerFixture : IDisposable
    {
        private string connectionID;
        private DapperExtensions.IDatabase _Db = null;

        private bool isDisposed = false; // 偵測多餘的呼叫

        /// <summary>
        /// ConnectionString 內定義的連線字串ID
        /// </summary>
        /// <param name="connectionID"></param>
        public SqlServerFixture(string connectionID)
        {
            this.connectionID = connectionID;
        }
        /// <summary>
        /// 取得DapperExtensions物件(並建立SQL Server Connection)
        /// </summary>
        public DapperExtensions.IDatabase Db
        {
            get
            {
                if (this._Db == null)
                {
                    SqlConnection Connection = new SqlConnection(GetConnectionString(this.connectionID));
                    var config = new DapperExtensions.DapperExtensionsConfiguration(typeof(DapperExtensions.Mapper.AutoClassMapper<>), new List<Assembly>(), new SqlServerDialect());
                    var sqlGenerator = new SqlGeneratorImpl(config);
                    this._Db = new DapperExtensions.Database(Connection, sqlGenerator);
                    return this._Db;
                }
                else
                {
                    if (this._Db.Connection.State == System.Data.ConnectionState.Closed)
                    {
                        this._Db.Connection.Open();
                    }
                    return this._Db;
                }
            }
        }
        #region IDisposable Support
        protected virtual void Dispose(bool disposing)
        {
            if (!isDisposed)
            {
                if (disposing)
                {
                    // TODO: 處置受控狀態 (受控物件)。
                }

                // TODO: 釋放非受控資源 (非受控物件) 並覆寫下方的完成項。
                // TODO: 將大型欄位設為 null。

                isDisposed = true;
            }
        }

        // TODO: 僅當上方的 Dispose(bool disposing) 具有會釋放非受控資源的程式碼時，才覆寫完成項。
        // ~SqlServerFixture() {
        //   // 請勿變更這個程式碼。請將清除程式碼放入上方的 Dispose(bool disposing) 中。
        //   Dispose(false);
        // }

        // 加入這個程式碼的目的在正確實作可處置的模式。
        void IDisposable.Dispose()
        {
            // 請勿變更這個程式碼。請將清除程式碼放入上方的 Dispose(bool disposing) 中。
            Dispose(true);
            // TODO: 如果上方的完成項已被覆寫，即取消下行的註解狀態。
            // GC.SuppressFinalize(this);
        }
        #endregion


        /// <summary>
        /// 取得Config檔內的DB 連線字串
        /// </summary>
        /// <param name="DB">DB ID</param>
        /// <returns></returns>
        public static string GetConnectionString(string DB)
        {
            string ConnectionString;
            ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings[DB].ConnectionString.ToString();
            return ConnectionString;
        }
    }
}