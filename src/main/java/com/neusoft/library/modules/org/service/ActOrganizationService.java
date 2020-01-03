
package com.neusoft.library.modules.org.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.persistence.Page;
import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.modules.org.entity.ActOrganization;
import com.neusoft.library.modules.org.dao.ActOrganizationDao;

/**
 * 组织活动Service
 *  
 * @version 2019-04-03
 */
@Service
@Transactional(readOnly = true)
public class ActOrganizationService extends CrudService<ActOrganizationDao, ActOrganization> {

	@Autowired
	private ActOrganizationDao actOrganizationDao;
	public ActOrganization get(String id) {
		return super.get(id);
	}
	
	public List<ActOrganization> findList(ActOrganization actOrganization) {
		return super.findList(actOrganization);
	}
	
	public Page<ActOrganization> findPage(Page<ActOrganization> page, ActOrganization actOrganization) {
		return super.findPage(page, actOrganization);
	}
	
	public Page<ActOrganization> findActPage(Page<ActOrganization> page,ActOrganization actOrganization,String userId){
		return super.findActPage(page, actOrganization,userId);
	}
	
	@Transactional(readOnly = false)
	public void save(ActOrganization actOrganization) {
		super.save(actOrganization);
	}
	
	@Transactional(readOnly = false)
	public void delete(ActOrganization actOrganization) {
		super.delete(actOrganization);
	}
	@Transactional(readOnly = false)
	public int registrationActivities(String actOrganizationId){
		return actOrganizationDao.registrationActivities(actOrganizationId);
	}
	@Transactional(readOnly = false)
	public int userActivity(String actOrganizationId,String userId){
		return actOrganizationDao.userActivity(actOrganizationId,userId);
	}
	
	public List<ActOrganization> findUserOrgList(String userId){
		return actOrganizationDao.findUserOrgList(userId);
	}
}