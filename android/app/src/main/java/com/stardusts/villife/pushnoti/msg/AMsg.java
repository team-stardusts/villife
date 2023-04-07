package com.stardusts.villife.pushnoti.msg;

abstract public class AMsg {
    private int category;
    private int detail_type;
    private String alias;

    public int getCategory() {
        return category;
    }

    public int getDetail_type() {
        return detail_type;
    }

    public String getAlias() {
        return alias;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public void setDetail_type(int detail_type) {
        this.detail_type = detail_type;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }
}
