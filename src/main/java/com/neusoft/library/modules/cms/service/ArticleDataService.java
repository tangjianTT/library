package com.neusoft.library.modules.cms.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.cms.dao.ArticleDataDao;
import com.neusoft.library.modules.cms.entity.ArticleData;

/**
 * 站点Service
 *  
 */
@Service
@Transactional(readOnly = true)
public class ArticleDataService extends CrudService<ArticleDataDao, ArticleData> {

}
