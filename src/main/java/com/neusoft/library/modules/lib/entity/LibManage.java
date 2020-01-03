
package com.neusoft.library.modules.lib.entity;

import com.neusoft.library.modules.sys.entity.Office;
import org.hibernate.validator.constraints.Length;

import com.neusoft.library.common.persistence.DataEntity;

/**
 * 馆内书建Entity
 * @author zl
 * @version 2020-01-02
 */
public class LibManage extends DataEntity<LibManage> {
	
	private static final long serialVersionUID = 1L;
	private Office office;		// 所属院校
	private String bookId;		// 图书编号
	private String bookName;		// 图书名称
	private String bookClassify;		// 图书分类
	private String bookPlace;		// 图书位置
	private String count;		// 数量
	
	public LibManage() {
		super();
	}

	public LibManage(String id){
		super(id);
	}

	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}
	
	@Length(min=0, max=255, message="图书编号长度必须介于 0 和 255 之间")
	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}
	
	@Length(min=0, max=64, message="图书名称长度必须介于 0 和 64 之间")
	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	
	@Length(min=0, max=64, message="图书分类长度必须介于 0 和 64 之间")
	public String getBookClassify() {
		return bookClassify;
	}

	public void setBookClassify(String bookClassify) {
		this.bookClassify = bookClassify;
	}
	
	@Length(min=0, max=64, message="图书位置长度必须介于 0 和 64 之间")
	public String getBookPlace() {
		return bookPlace;
	}

	public void setBookPlace(String bookPlace) {
		this.bookPlace = bookPlace;
	}
	
	@Length(min=0, max=64, message="数量长度必须介于 0 和 64 之间")
	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}
	
}