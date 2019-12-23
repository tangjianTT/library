package com.neusoft.library.modules.cms.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.cms.entity.ArticleData;

/**
 * 文章DAO接口
 *  
 */
@MyBatisDao
public interface ArticleDataDao extends CrudDao<ArticleData> {
	
}
