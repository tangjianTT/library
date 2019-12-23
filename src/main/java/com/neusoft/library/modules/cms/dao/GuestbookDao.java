package com.neusoft.library.modules.cms.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.cms.entity.Guestbook;

/**
 * 留言DAO接口
 *  
 */
@MyBatisDao
public interface GuestbookDao extends CrudDao<Guestbook> {

}
