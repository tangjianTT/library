/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.userlib.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.userlib.entity.SysUserLib;
import com.neusoft.library.modules.userlib.dao.SysUserLibDao;

/**
 * 图书借阅Service
 * @author zl
 * @version 2020-01-02
 */
@Service
@Transactional(readOnly = true)
public class SysUserLibService extends CrudService<SysUserLibDao, SysUserLib> {

	@Autowired
	private SysUserLibDao sysUserLibDao;

	public SysUserLib get(String id) {
		return super.get(id);
	}
	
	public List<SysUserLib> findList(SysUserLib sysUserLib) {
		return super.findList(sysUserLib);
	}
	
	public Page<SysUserLib> findPage(Page<SysUserLib> page, SysUserLib sysUserLib) {
		return super.findPage(page, sysUserLib);
	}
	
	@Transactional(readOnly = false)
	public void save(SysUserLib sysUserLib) {
		super.save(sysUserLib);
	}
	
	@Transactional(readOnly = false)
	public void delete(SysUserLib sysUserLib) {
		super.delete(sysUserLib);
	}


	@Transactional(readOnly = false)
	public void back(SysUserLib lib){
		sysUserLibDao.back(lib);
	}

}