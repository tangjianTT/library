
package com.neusoft.library.modules.gen.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.gen.entity.GenTable;

/**
 * 业务表DAO接口
 */
@MyBatisDao
public interface GenTableDao extends CrudDao<GenTable> {
	
}
