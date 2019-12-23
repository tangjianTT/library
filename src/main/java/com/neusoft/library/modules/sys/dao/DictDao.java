package com.neusoft.library.modules.sys.dao;

import java.util.List;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.sys.entity.Dict;

/**
 * 字典DAO接口
 *  
 */
@MyBatisDao
public interface DictDao extends CrudDao<Dict> {

	public List<String> findTypeList(Dict dict);
	
}
