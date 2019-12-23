package com.neusoft.library.modules.sys.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.sys.entity.Log;

/**
 * 日志DAO接口
 *  
 */
@MyBatisDao
public interface LogDao extends CrudDao<Log> {

}
