require 'rails_helper'

RSpec.describe "items/new", type: :view do
  before(:each) do
    assign(:item, Item.new(
      :weight => 1.5,
      :type => "",
      :name => "MyString",
      :characteristic => "MyString"
    ))
  end

  it "renders new item form" do
    render

    assert_select "form[action=?][method=?]", items_path, "post" do

      assert_select "input#item_weight[name=?]", "item[weight]"

      assert_select "input#item_type[name=?]", "item[type]"

      assert_select "input#item_name[name=?]", "item[name]"

      assert_select "input#item_characteristic[name=?]", "item[characteristic]"
    end
  end
end
