require 'rails_helper'

RSpec.describe "items/edit", type: :view do
  before(:each) do
    @item = assign(:item, Item.create!(
      :weight => 1.5,
      :type => "",
      :name => "MyString",
      :characteristic => "MyString"
    ))
  end

  it "renders the edit item form" do
    render

    assert_select "form[action=?][method=?]", item_path(@item), "post" do

      assert_select "input#item_weight[name=?]", "item[weight]"

      assert_select "input#item_type[name=?]", "item[type]"

      assert_select "input#item_name[name=?]", "item[name]"

      assert_select "input#item_characteristic[name=?]", "item[characteristic]"
    end
  end
end
