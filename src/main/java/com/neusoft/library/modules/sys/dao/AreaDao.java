package com.neusoft.library.modules.sys.dao;

import com.neusoft.library.common.persistence.TreeDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.sys.entity.Area;

/**
 * 区域DAO接口
 *  
 */
@MyBatisDao
public interface AreaDao extends TreeDao<Area> {
	
}
