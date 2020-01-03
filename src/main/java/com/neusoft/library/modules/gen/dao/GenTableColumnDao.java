
package com.neusoft.library.modules.gen.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.gen.entity.GenTableColumn;

/**
 * 业务表字段DAO接口
 */
@MyBatisDao
public interface GenTableColumnDao extends CrudDao<GenTableColumn> {
	
	public void deleteByGenTableId(String genTableId);
}
