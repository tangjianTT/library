/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.neusoft.library.modules.userlib.entity;

import com.neusoft.library.modules.sys.entity.Office;
import com.neusoft.library.modules.sys.entity.User;
import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.neusoft.library.common.persistence.DataEntity;

/**
 * 图书借阅Entity
 * @author zl
 * @version 2020-01-02
 */
public class SysUserLib extends DataEntity<SysUserLib> {
	
	private static final long serialVersionUID = 1L;
	private Office office;		// 所属院校
	private User user;		// 借阅人
	private String bookId;		// 图书编号
	private String bookName;		// 图书名称
	private String flag;		// 是否归还
	private Date borrowTime;		// 借阅日期
	private Date returnTime;		// 归还日期
	
	public SysUserLib() {
		super();
	}

	public SysUserLib(String id){
		super(id);
	}

	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@Length(min=0, max=64, message="图书编号长度必须介于 0 和 64 之间")
	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}
	
	@Length(min=0, max=255, message="图书名称长度必须介于 0 和 255 之间")
	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	
	@Length(min=0, max=1, message="是否归还长度必须介于 0 和 1 之间")
	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getBorrowTime() {
		return borrowTime;
	}

	public void setBorrowTime(Date borrowTime) {
		this.borrowTime = borrowTime;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getReturnTime() {
		return returnTime;
	}

	public void setReturnTime(Date returnTime) {
		this.returnTime = returnTime;
	}
	
}