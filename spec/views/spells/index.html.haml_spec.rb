require 'rails_helper'

RSpec.describe "spells/index", type: :view do
  before(:each) do
    assign(:spells, [
      Spell.create!(
        :type => "Type",
        :characteristic => "Characteristic"
      ),
      Spell.create!(
        :type => "Type",
        :characteristic => "Characteristic"
      )
    ])
  end

  it "renders a list of spells" do
    render
    assert_select "tr>td", :text => "Type".to_s, :count => 2
    assert_select "tr>td", :text => "Characteristic".to_s, :count => 2
  end
end
