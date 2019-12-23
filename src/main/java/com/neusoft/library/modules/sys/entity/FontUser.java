package com.neusoft.library.modules.sys.entity;

import java.util.Date;

import com.neusoft.library.common.persistence.DataEntity;

/**
 * 普通用户Entity
 *  
 */
public class FontUser extends DataEntity<FontUser> {
	private static final long serialVersionUID = 1L;
    private String userId;    //用户Id
    private String password;  //用户密码
    private String nickname;  //昵称
    private String phoneNumber; //电话号码
    private String email;      //电子邮件
    private Date createTime;  //注册时间
    private Date updateTime;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public String toString() {
		return "FontUser [userId=" + userId + ", password=" + password + ", nickname=" + nickname + ", phoneNumber="
				+ phoneNumber + ", email=" + email + ", createTime=" + createTime + ", updateTime=" + updateTime + "]";
	}
    

}
