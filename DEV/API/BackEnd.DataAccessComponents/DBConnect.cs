

using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;

namespace BackEnd.DataAccessComponents
{
    public class DBConnect
    {
        private MySqlConnection connection;

        public DBConnect()
        {
            string strConnString = ConfigurationManager.ConnectionStrings["Ocupa"].ConnectionString;

            connection = new MySqlConnection(strConnString);
        }

        private bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        private bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        #region ArmadoQuerys
        public string QueriInsert(Dictionary<string, object> valores, bool isReturnRequ)
        {
            string szSalida = string.Empty;
            foreach (var item in valores)
            {
                if (szSalida == string.Empty)
                {
                    szSalida += " ( " + item.Key;
                }
                else
                {
                    szSalida += "," + item.Key;
                }
            }
            szSalida += " ) VALUES ( ";
            foreach (var item in valores)
            {
                if (item.Value == null)
                {
                    szSalida += "Null,";
                }
                else
                {
                    switch (item.Value.GetType().ToString())
                    {
                        case "System.DateTime":
                            {
                                szSalida += "'" + Convert.ToDateTime(item.Value).ToString("yyyy-MM-dd H:mm:ss") + "',";
                                break;
                            }
                        case "System.Byte":
                            {
                                szSalida += "" + item.Value + ",";
                                break;
                            }
                        case "System.Guid":
                        case "System.String":
                            {
                                if (Convert.ToString(item.Value) == "")
                                {
                                    szSalida += "Null,";
                                }
                                else
                                {
                                    if (Convert.ToString(item.Value).Contains("Point("))
                                    {
                                        szSalida += "" + item.Value + ",";
                                    }
                                    else
                                    {
                                        szSalida += "'" + item.Value + "',";
                                    }
                                }
                                break;
                            }
                        case "System.Int16":
                        case "System.Int32":
                        case "System.Int64":
                            {
                                szSalida += "" + item.Value + ",";
                                break;
                            }
                        case "System.Decimal":
                            {
                                szSalida += "" + Convert.ToString(item.Value).Replace(",", ".") + ",";
                                break;
                            }
                        case "System.Boolean":
                            {
                                szSalida += "" + Convert.ToBoolean(item.Value) + ",";
                                break;
                            }
                        case "System.Double":
                            {
                                szSalida += "" + Convert.ToString(item.Value).Replace(",", ".") + ",";
                                break;
                            }
                    }
                }
            }
            szSalida = szSalida.Remove(szSalida.Length - 1, 1);
            szSalida += ");";
            if (isReturnRequ)
            {
                szSalida += " SELECT LAST_INSERT_ID(); ";
            }
            return szSalida;
        }

        public string QueriUpdateWhere(Dictionary<string, object> valores, bool isWhere)
        {
            string szAnds = string.Empty;
            if (isWhere)
            {
                szAnds = " WHERE 1=1 ";
            }
            else
            {
                szAnds = " SET ";
            }
            foreach (var item in valores)
            {
                if (item.Value != null)
                {
                    switch (item.Value.GetType().ToString())
                    {
                        case "System.DateTime":
                            {
                                if (isWhere)
                                {
                                    szAnds += " AND DATE(" + item.Key + ") = '" + Convert.ToDateTime(item.Value).ToString("yyyy-MM-dd H:mm:ss") + "' ";
                                }
                                else
                                {
                                    szAnds += " " + item.Key + " = '" + Convert.ToDateTime(item.Value).ToString("yyyy-MM-dd H:mm:ss") + "',";
                                }
                                break;
                            }
                        case "System.Byte":
                            {
                                if (isWhere)
                                {
                                    szAnds += " AND " + item.Key + " = " + item.Value + " ";
                                }
                                else
                                {
                                    szAnds += " " + item.Key + " = " + item.Value + ",";
                                }
                                break;
                            }
                        case "System.Guid":
                        case "System.String":
                            {
                                if (isWhere)
                                {
                                    if (Convert.ToString(item.Value).Contains("Point"))
                                    {
                                        szAnds += " AND " + item.Key + " = " + item.Value + " ";
                                    }
                                    else
                                    {
                                        szAnds += " AND " + item.Key + " = '" + item.Value + "' ";
                                    }
                                }
                                else
                                {
                                    if (Convert.ToString(item.Value).Contains("Point"))
                                    {
                                        szAnds += " " + item.Key + " = " + item.Value + ",";
                                    }
                                    else
                                    {
                                        szAnds += " " + item.Key + " = '" + item.Value + "',";
                                    }
                                }
                                break;
                            }
                        case "System.Int16":
                        case "System.Int32":
                        case "System.Int64":
                            {
                                if (isWhere)
                                {
                                    szAnds += " AND " + item.Key + " = " + item.Value + " ";
                                }
                                else
                                {
                                    szAnds += " " + item.Key + " = " + item.Value + ",";
                                }
                                break;
                            }
                        case "System.Decimal":
                            {
                                if (isWhere)
                                {
                                    szAnds += " AND " + item.Key + " = " + Convert.ToString(item.Value).Replace(",", ".") + " ";
                                }
                                else
                                {
                                    szAnds += " " + item.Key + " = " + Convert.ToString(item.Value).Replace(",", ".") + ",";
                                }
                                break;
                            }
                        case "System.Boolean":
                            {
                                if (isWhere)
                                {
                                    szAnds += " AND " + item.Key + "  = " + Convert.ToInt32(item.Value) + " ";
                                }
                                else
                                {
                                    szAnds += " " + item.Key + " = " + Convert.ToInt32(item.Value) + ",";
                                }
                                break;
                            }
                        case "System.Double":
                            {
                                if (isWhere)
                                {
                                    szAnds += " AND " + item.Key + " = " + Convert.ToString(item.Value).Replace(",", ".") + " ";
                                }
                                else
                                {
                                    szAnds += " " + item.Key + " = " + Convert.ToString(item.Value).Replace(",", ".") + ",";
                                }
                                break;
                            }
                    }
                }            
            }
            if (szAnds[szAnds.Length - 1] == ',')
            {
                szAnds = szAnds.Remove(szAnds.Length - 1, 1);
            }
            return szAnds;
        }
        #endregion

        #region Operaciones
        internal int Insert(string pTabla, string pzinsert)
        {
            DBConnect oDBConnect = new DBConnect();
            DataTable oDataTable = null;
            int iSalida = 0;
            try
            {
                string query = "INSERT " + pTabla;
                oDataTable = oDBConnect.Query(query, null, null, pzinsert);
                if (oDataTable != null)
                {
                    iSalida = Convert.ToInt32(oDataTable.Rows[0][0]);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDataTable = null;
                oDBConnect = null;
            }
            return iSalida;
        }

        internal void Delete(string vpTabla, string pzwheres)
        {
            DBConnect oDBConnect = new DBConnect();
            try
            {
                string query = "DELETE FROM " + vpTabla;
                oDBConnect.Query(query, null, pzwheres, null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDBConnect = null;
            }
        }

        internal void Update(string pTabla, string pzupdates, string pzwheres)
        {
            DBConnect oDBConnect = new DBConnect();
            try
            {
                string query = "UPDATE " + pTabla;
                oDBConnect.Query(query, pzupdates, pzwheres, null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDBConnect = null;
            }
        }

        internal DataSet GetByParam(string pTable, string pzwheres)
        {
            DataSet oDataSet = new DataSet();
            DataTable oDataTable = null;
            DBConnect oDBConnect = new DBConnect();
            try
            {
                string query = "SELECT * FROM " + pTable;
                oDataTable = oDBConnect.Query(query, null, pzwheres, null);
                if (oDataTable != null)
                {
                    oDataSet.Tables.Add(oDataTable);
                }
                return oDataSet;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDataSet = null;
                oDataTable = null;
                oDBConnect = null;
            }
        }

        internal DataSet GetByParam(string query)
        {
            DataSet oDataSet = new DataSet();
            DataTable oDataTable = null;
            DBConnect oDBConnect = new DBConnect();
            try
            {                
                oDataTable = oDBConnect.Query(query, null, null, null);
                if (oDataTable != null)
                {
                    oDataSet.Tables.Add(oDataTable);
                }
                return oDataSet;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDataSet = null;
                oDataTable = null;
                oDBConnect = null;
            }
        }

        internal DataSet GetAll(string pTabla, string pzOrderBY = null)
        {
            DataSet oDataSet = new DataSet();
            DataTable oDataTable = null;
            DBConnect oDBConnect = new DBConnect();
            try
            {
                string query = "SELECT * FROM " + pTabla;
                if (pzOrderBY != null)
                {
                    query += " order by " + pzOrderBY;
                }
                oDataTable = oDBConnect.Query(query, null, null, null);
                if (oDataTable != null)
                {
                    oDataSet.Tables.Add(oDataTable);
                }
                return oDataSet;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDataSet = null;
                oDataTable = null;
                oDBConnect = null;
            }
        }

        

        internal DataTable Query(string pzquery, string pzupdates, string pzwheres, string pzInsert)
        {
            if (pzupdates != null & pzwheres != null & pzInsert == null)
            {
                pzquery = pzquery + pzupdates + pzwheres;
            }
            if (pzupdates == null & pzwheres != null & pzInsert == null)
            {
                pzquery = pzquery + pzwheres;
            }
            if (pzupdates == null & pzwheres == null & pzInsert != null)
            {
                pzquery = pzquery + pzInsert;
            }
            if (pzupdates == null & pzwheres == null & pzInsert == null)
            {

            }

            DataTable dataTable = new DataTable();

            if (this.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(pzquery, connection);

                MySqlDataReader dataReader = cmd.ExecuteReader();

                dataTable.Load(dataReader);

                dataReader.Close();

                this.CloseConnection();

                return dataTable;
            }
            else
            {
                return dataTable;
            }
        }
        #endregion
    }
}
