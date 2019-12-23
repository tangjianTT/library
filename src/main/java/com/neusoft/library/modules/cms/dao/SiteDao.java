package com.neusoft.library.modules.cms.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.cms.entity.Site;

/**
 * 站点DAO接口
 *  
 */
@MyBatisDao
public interface SiteDao extends CrudDao<Site> {

}
