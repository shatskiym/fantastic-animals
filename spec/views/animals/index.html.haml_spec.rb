require 'rails_helper'

RSpec.describe "animals/index", type: :view do
  before(:each) do
    assign(:animals, [
      Animal.create!(
        :name => "Name",
        :element => "Element",
        :power_type => "Power Type",
        :life => 2,
        :will => 3
      ),
      Animal.create!(
        :name => "Name",
        :element => "Element",
        :power_type => "Power Type",
        :life => 2,
        :will => 3
      )
    ])
  end

  it "renders a list of animals" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Element".to_s, :count => 2
    assert_select "tr>td", :text => "Power Type".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
