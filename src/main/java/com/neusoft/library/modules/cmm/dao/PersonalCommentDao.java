/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.cmm.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.cmm.entity.PersonalComment;

/**
 * 我的评论DAO接口
 *  
 * @version 2019-04-18
 */
@MyBatisDao
public interface PersonalCommentDao extends CrudDao<PersonalComment> {
	
}