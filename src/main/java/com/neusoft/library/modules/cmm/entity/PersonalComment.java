/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.cmm.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.NotNull;

import com.neusoft.library.common.persistence.DataEntity;
import com.neusoft.library.modules.cms.entity.Category;
import com.neusoft.library.modules.sys.entity.User;

/**
 * 我的评论Entity
 *  
 * @version 2019-04-18
 */
public class PersonalComment extends DataEntity<PersonalComment> {
	
	private static final long serialVersionUID = 1L;
	private String categoryId;		// 栏目编号
	private String contentId;		// 栏目内容的编号
	private String title;		// 栏目内容的标题
	private String content;		// 评论内容
	private String name;		// 评论姓名
	private String ip;		// 评论IP
	private String auditUserId;		// 审核人
	private Date auditDate;		// 审核时间
	private String commentsId;		// comments_id
	
	private Category category;// 分类编号

	private Date createDate;// 评论时间
	private User auditUser; // 审核人
	private String delFlag;	// 删除标记删除标记（0：正常；1：删除；2：审核）
	
	
	
	
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public User getAuditUser() {
		return auditUser;
	}

	public void setAuditUser(User auditUser) {
		this.auditUser = auditUser;
	}

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

	public PersonalComment() {
		super();
	}

	public PersonalComment(String id){
		super(id);
	}

	@Length(min=1, max=64, message="栏目编号长度必须介于 1 和 64 之间")
	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	
	@Length(min=1, max=64, message="栏目内容的编号长度必须介于 1 和 64 之间")
	public String getContentId() {
		return contentId;
	}

	public void setContentId(String contentId) {
		this.contentId = contentId;
	}
	
	@Length(min=1, max=255, message="栏目内容的标题长度必须介于 1 和 255 之间")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	@Length(min=1, max=255, message="评论内容长度必须介于 1 和 255 之间")
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	@Length(min=1, max=100, message="评论姓名长度必须介于 1 和 100 之间")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Length(min=1, max=100, message="评论IP长度必须介于 1 和 100 之间")
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
	
	@Length(min=1, max=64, message="审核人长度必须介于 1 和 64 之间")
	public String getAuditUserId() {
		return auditUserId;
	}

	public void setAuditUserId(String auditUserId) {
		this.auditUserId = auditUserId;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@NotNull(message="审核时间不能为空")
	public Date getAuditDate() {
		return auditDate;
	}

	public void setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
	}
	
	@Length(min=1, max=64, message="comments_id长度必须介于 1 和 64 之间")
	public String getCommentsId() {
		return commentsId;
	}

	public void setCommentsId(String commentsId) {
		this.commentsId = commentsId;
	}
	
}