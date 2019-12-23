package com.neusoft.library.modules.cms.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.cms.dao.CommentDao;
import com.neusoft.library.modules.cms.entity.Article;
import com.neusoft.library.modules.cms.entity.Comment;

/**
 * 评论Service
 *  
 */
@Service
@Transactional(readOnly = true)
public class CommentService extends CrudService<CommentDao, Comment> {

	public Page<Comment> findPage(Page<Comment> page, Comment comment) {

        comment.getSqlMap().put("dsf", dataScopeFilter(comment.getCurrentUser(), "o", "u"));
		
		return super.findPage(page, comment);
	}
	
	@Transactional(readOnly = false)
	public void delete(Comment entity, Boolean isRe) {
		entity.setDelFlag(isRe!=null&&isRe?Article.DEL_FLAG_AUDIT:Article.DEL_FLAG_DELETE);
		super.delete(entity);
	}
}
