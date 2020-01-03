
package com.neusoft.library.modules.lib.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.lib.entity.LibManage;
import com.neusoft.library.modules.lib.dao.LibManageDao;

/**
 * 馆内书建Service
 * @author zl
 * @version 2020-01-02
 */
@Service
@Transactional(readOnly = true)
public class LibManageService extends CrudService<LibManageDao, LibManage> {

	@Autowired
	private LibManageDao libManageDao;

	public LibManage get(String id) {
		return super.get(id);
	}
	
	public List<LibManage> findList(LibManage libManage) {
		return super.findList(libManage);
	}
	
	public Page<LibManage> findPage(Page<LibManage> page, LibManage libManage) {
		return super.findPage(page, libManage);
	}
	
	@Transactional(readOnly = false)
	public void save(LibManage libManage) {
		super.save(libManage);
	}
	
	@Transactional(readOnly = false)
	public void delete(LibManage libManage) {
		super.delete(libManage);
	}

	public LibManage getLib(String bookId){
		return libManageDao.getLib(bookId);
	}
}