/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.userlib.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.userlib.entity.SysUserLib;

/**
 * 图书借阅DAO接口
 * @author zl
 * @version 2020-01-02
 */
@MyBatisDao
public interface SysUserLibDao extends CrudDao<SysUserLib> {

    void back(SysUserLib lib);
}