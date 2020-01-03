
package com.neusoft.library.modules.gen.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.gen.entity.GenScheme;

/**
 * 生成方案DAO接口
 */
@MyBatisDao
public interface GenSchemeDao extends CrudDao<GenScheme> {
	
}
