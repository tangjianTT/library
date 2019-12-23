package com.neusoft.library.modules.sys.dao;

import com.neusoft.library.common.persistence.TreeDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.sys.entity.Office;

/**
 * 机构DAO接口
 *  
 */
@MyBatisDao
public interface OfficeDao extends TreeDao<Office> {
	
}
