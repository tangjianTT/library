
package com.neusoft.library.modules.goo.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.NotNull;

import com.neusoft.library.common.persistence.DataEntity;
import com.neusoft.library.modules.sys.entity.User;

/**
 * 我的留言Entity
 *  
 * @version 2019-04-18
 */
public class PersonalGuestbook extends DataEntity<PersonalGuestbook> {
	
	private static final long serialVersionUID = 1L;
	private String type;		// 留言分类
	private String content;		// 留言内容
	private String name;		// 姓名
	private String email;		// 邮箱
	private String phone;		// 电话
	private String workunit;		// 单位
	private String ip;		// IP
	private String reUserId;		// 回复人
	private Date reDate;		// 回复时间
	private String reContent;		// 回复内容
	private String guestbookId;		// guestbook_id
	private String id;
	
	private Date createDate;// 留言时间
	private User reUser; 		// 回复人
	private String delFlag;	// 删除标记删除标记（0：正常；1：删除；2：审核）

	
	
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public User getReUser() {
		return reUser;
	}

	public void setReUser(User reUser) {
		this.reUser = reUser;
	}

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

	public PersonalGuestbook() {
		super();
	}

	public PersonalGuestbook(String id){
		super(id);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Length(min=1, max=1, message="留言分类长度必须介于 1 和 1 之间")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Length(min=1, max=255, message="留言内容长度必须介于 1 和 255 之间")
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	@Length(min=1, max=100, message="姓名长度必须介于 1 和 100 之间")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Length(min=1, max=100, message="邮箱长度必须介于 1 和 100 之间")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	@Length(min=1, max=100, message="电话长度必须介于 1 和 100 之间")
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	@Length(min=1, max=100, message="单位长度必须介于 1 和 100 之间")
	public String getWorkunit() {
		return workunit;
	}

	public void setWorkunit(String workunit) {
		this.workunit = workunit;
	}
	
	@Length(min=1, max=100, message="IP长度必须介于 1 和 100 之间")
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
	
	@Length(min=1, max=64, message="回复人长度必须介于 1 和 64 之间")
	public String getReUserId() {
		return reUserId;
	}

	public void setReUserId(String reUserId) {
		this.reUserId = reUserId;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@NotNull(message="回复时间不能为空")
	public Date getReDate() {
		return reDate;
	}

	public void setReDate(Date reDate) {
		this.reDate = reDate;
	}
	
	@Length(min=1, max=100, message="回复内容长度必须介于 1 和 100 之间")
	public String getReContent() {
		return reContent;
	}

	public void setReContent(String reContent) {
		this.reContent = reContent;
	}
	
	@Length(min=1, max=64, message="guestbook_id长度必须介于 1 和 64 之间")
	public String getGuestbookId() {
		return guestbookId;
	}

	public void setGuestbookId(String guestbookId) {
		this.guestbookId = guestbookId;
	}
	
}