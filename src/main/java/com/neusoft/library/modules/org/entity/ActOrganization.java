
package com.neusoft.library.modules.org.entity;

import org.hibernate.validator.constraints.Length;
import com.neusoft.library.modules.sys.entity.Office;
import javax.validation.constraints.NotNull;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.neusoft.library.common.persistence.DataEntity;

/**
 * 组织活动Entity
 *  
 * @version 2019-04-03
 */
public class ActOrganization extends DataEntity<ActOrganization> {
	
	private static final long serialVersionUID = 1L;
	private String title;		// 活动标题
	private Office office;		// 发布组织
	private String actDescribe;		// 活动描述
	private String place;		// 活动地点
	private Date startDate;		// 开始日期
	private Date endDate;		// 结束日期
	private String state;		// 状态
	private String count;		// 参与人数
	private Date beginStartDate;		// 开始 开始日期
	private Date endStartDate;		// 结束 开始日期
	private String id;
	private String flag;
	private String userId;
	
	
	
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ActOrganization() {
		super();
	}

	public ActOrganization(String id){
		super(id);
	}

	@Length(min=1, max=64, message="活动标题长度必须介于 1 和 64 之间")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	@NotNull(message="发布组织不能为空")
	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}
	
	@Length(min=1, max=64, message="活动描述长度必须介于 1 和 64 之间")
	public String getActDescribe() {
		return actDescribe;
	}

	public void setActDescribe(String actDescribe) {
		this.actDescribe = actDescribe;
	}
	
	@Length(min=1, max=64, message="活动地点长度必须介于 1 和 64 之间")
	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@NotNull(message="开始日期不能为空")
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@NotNull(message="结束日期不能为空")
	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	@Length(min=1, max=64, message="状态长度必须介于 1 和 64 之间")
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	@Length(min=1, max=64, message="参与人数长度必须介于 1 和 64 之间")
	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}
	
	public Date getBeginStartDate() {
		return beginStartDate;
	}

	public void setBeginStartDate(Date beginStartDate) {
		this.beginStartDate = beginStartDate;
	}
	
	public Date getEndStartDate() {
		return endStartDate;
	}

	public void setEndStartDate(Date endStartDate) {
		this.endStartDate = endStartDate;
	}
		
}