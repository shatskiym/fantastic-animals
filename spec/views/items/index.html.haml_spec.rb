require 'rails_helper'

RSpec.describe "items/index", type: :view do
  before(:each) do
    assign(:items, [
      Item.create!(
        :weight => 2.5,
        :type => "Type",
        :name => "Name",
        :characteristic => "Characteristic"
      ),
      Item.create!(
        :weight => 2.5,
        :type => "Type",
        :name => "Name",
        :characteristic => "Characteristic"
      )
    ])
  end

  it "renders a list of items" do
    render
    assert_select "tr>td", :text => 2.5.to_s, :count => 2
    assert_select "tr>td", :text => "Type".to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Characteristic".to_s, :count => 2
  end
end
