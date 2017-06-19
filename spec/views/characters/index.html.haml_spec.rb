require 'rails_helper'

RSpec.describe "characters/index", type: :view do
  before(:each) do
    assign(:characters, [
      Character.create!(
        :name => "Name",
        :class => "Class",
        :power => 2
      ),
      Character.create!(
        :name => "Name",
        :class => "Class",
        :power => 2
      )
    ])
  end

  it "renders a list of characters" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Class".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
