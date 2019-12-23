package com.neusoft.library.modules.sys.dao;

import org.apache.ibatis.annotations.Param;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.sys.entity.FontUser;
import com.neusoft.library.modules.sys.entity.User;

/**
 * 普通用户DAO接口
 *  
 */
@MyBatisDao
public interface FontUserDao extends CrudDao<FontUser>{

	public User getUserByLoginNameOrEmail(@Param("loginNameOrEmail")String loginNameOrEmail);


}
