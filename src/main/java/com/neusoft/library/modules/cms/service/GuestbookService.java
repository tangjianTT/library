package com.neusoft.library.modules.cms.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.cms.dao.GuestbookDao;
import com.neusoft.library.modules.cms.entity.Article;
import com.neusoft.library.modules.cms.entity.Guestbook;

/**
 * 留言Service
 *  
 */
@Service
@Transactional(readOnly = true)
public class GuestbookService extends CrudService<GuestbookDao, Guestbook> {

	public Guestbook get(String id) {
		return dao.get(id);
	}
	
	public Page<Guestbook> findPage(Page<Guestbook> page, Guestbook guestbook) {

		guestbook.getSqlMap().put("dsf", dataScopeFilter(guestbook.getCurrentUser(), "o", "u"));
		
		guestbook.setPage(page);
		page.setList(dao.findList(guestbook));
		return page;
	}
	
	@Transactional(readOnly = false)
	public void delete(Guestbook guestbook, Boolean isRe) {
		guestbook.setDelFlag(isRe!=null&&isRe?Article.DEL_FLAG_AUDIT:Article.DEL_FLAG_DELETE);
		dao.delete(guestbook);
	}
	
	
}
