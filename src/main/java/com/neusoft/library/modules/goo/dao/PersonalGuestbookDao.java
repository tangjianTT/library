
package com.neusoft.library.modules.goo.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.goo.entity.PersonalGuestbook;

/**
 * 我的留言DAO接口
 *  
 * @version 2019-04-18
 */
@MyBatisDao
public interface PersonalGuestbookDao extends CrudDao<PersonalGuestbook> {
	
}