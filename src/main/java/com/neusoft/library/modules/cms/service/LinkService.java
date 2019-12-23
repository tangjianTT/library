package com.neusoft.library.modules.cms.service;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;
import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.common.utils.CacheUtils;
import com.neusoft.library.common.utils.StringUtils;
import com.neusoft.library.modules.cms.dao.CategoryDao;
import com.neusoft.library.modules.cms.dao.LinkDao;
import com.neusoft.library.modules.cms.entity.Category;
import com.neusoft.library.modules.cms.entity.Link;

/**
 * 链接Service
 *  
 */
@Service
@Transactional(readOnly = true)
public class LinkService extends CrudService<LinkDao, Link> {

	@Autowired
	private CategoryDao categoryDao;
	@Transactional(readOnly = false)
	public Page<Link> findPage(Page<Link> page, Link link, boolean isDataScopeFilter) {
		// 更新过期的权重，间隔为“6”个小时
		Date updateExpiredWeightDate =  (Date)CacheUtils.get("updateExpiredWeightDateByLink");
		if (updateExpiredWeightDate == null || (updateExpiredWeightDate != null 
				&& updateExpiredWeightDate.getTime() < new Date().getTime())){
			dao.updateExpiredWeight(link);
			CacheUtils.put("updateExpiredWeightDateByLink", DateUtils.addHours(new Date(), 6));
		}
		if (link.getCategory()!=null && StringUtils.isNotBlank(link.getCategory().getId()) && !Category.isRoot(link.getCategory().getId())){
			Category category = categoryDao.get(link.getCategory().getId());
			if (category==null){
				category = new Category();
			}
			category.setParentIds(category.getId());
			category.setSite(category.getSite());
			link.setCategory(category);
		}
		else{
			link.setCategory(new Category());
		}
		link.getSqlMap().put("dsf", dataScopeFilter(link.getCurrentUser(), "o", "u"));
		
		return super.findPage(page, link);
	}
	
	@Transactional(readOnly = false)
	public void delete(Link link, Boolean isRe) {
		//dao.updateDelFlag(id, isRe!=null&&isRe?Link.DEL_FLAG_NORMAL:Link.DEL_FLAG_DELETE);
		link.setDelFlag(isRe!=null&&isRe?Link.DEL_FLAG_NORMAL:Link.DEL_FLAG_DELETE);
		dao.delete(link);
	}
	
	/**
	 * 通过编号获取内容标题
	 */
	public List<Object[]> findByIds(String ids) {
		List<Object[]> list = Lists.newArrayList();
		String[] idss = StringUtils.split(ids,",");
		if (idss.length>0){
			List<Link> l = dao.findByIdIn(idss);
			for (Link e : l){
				list.add(new Object[]{e.getId(),StringUtils.abbr(e.getTitle(),50)});
			}
		}
		return list;
	}

}
