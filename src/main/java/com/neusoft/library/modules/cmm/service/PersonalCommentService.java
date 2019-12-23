/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.cmm.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.cmm.entity.PersonalComment;
import com.neusoft.library.modules.cmm.dao.PersonalCommentDao;

/**
 * 我的评论Service
 *  
 * @version 2019-04-18
 */
@Service
@Transactional(readOnly = true)
public class PersonalCommentService extends CrudService<PersonalCommentDao, PersonalComment> {

	public PersonalComment get(String id) {
		return super.get(id);
	}
	
	public List<PersonalComment> findList(PersonalComment personalComment) {
		return super.findList(personalComment);
	}
	
	public Page<PersonalComment> findPage(Page<PersonalComment> page, PersonalComment personalComment) {
		return super.findPage(page, personalComment);
	}
	
	
}