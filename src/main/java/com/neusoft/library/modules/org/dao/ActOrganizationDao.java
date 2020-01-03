
package com.neusoft.library.modules.org.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.neusoft.library.common.persistence.CrudDao;
import com.neusoft.library.common.persistence.annotation.MyBatisDao;
import com.neusoft.library.modules.org.entity.ActOrganization;

/**
 * 组织活动DAO接口
 *  
 * @version 2019-04-03
 */
@MyBatisDao
public interface ActOrganizationDao extends CrudDao<ActOrganization> {
	
	public int registrationActivities(String actOrganizationId);
	
	public int userActivity(@Param("actOrganizationId")String actOrganizationId,@Param("userId")String userId);

    public List<ActOrganization> findUserOrgList(String userId);
}