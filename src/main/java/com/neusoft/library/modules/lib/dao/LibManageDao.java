
package com.neusoft.library.modules.lib.dao;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.lib.entity.LibManage;

/**
 * 馆内书建DAO接口
 * @author zl
 * @version 2020-01-02
 */
@MyBatisDao
public interface LibManageDao extends CrudDao<LibManage> {

    LibManage getLib(String bookId);
}