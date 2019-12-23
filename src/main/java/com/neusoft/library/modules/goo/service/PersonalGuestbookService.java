/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.goo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.goo.entity.PersonalGuestbook;
import com.neusoft.library.modules.goo.dao.PersonalGuestbookDao;

/**
 * 我的留言Service
 *  
 * @version 2019-04-18
 */
@Service
@Transactional(readOnly = true)
public class PersonalGuestbookService extends CrudService<PersonalGuestbookDao, PersonalGuestbook> {

	public PersonalGuestbook get(String id) {
		return super.get(id);
	}
	
	public List<PersonalGuestbook> findList(PersonalGuestbook personalGuestbook) {
		return super.findList(personalGuestbook);
	}
	
	public Page<PersonalGuestbook> findPage(Page<PersonalGuestbook> page, PersonalGuestbook personalGuestbook) {
		return super.findPage(page, personalGuestbook);
	}
	
	@Transactional(readOnly = false)
	public void save(PersonalGuestbook personalGuestbook) {
		super.save(personalGuestbook);
	}
	
	@Transactional(readOnly = false)
	public void delete(PersonalGuestbook personalGuestbook) {
		super.delete(personalGuestbook);
	}
	
}