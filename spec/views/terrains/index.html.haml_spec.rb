require 'rails_helper'

RSpec.describe "terrains/index", type: :view do
  before(:each) do
    assign(:terrains, [
      Terrain.create!(
        :element => "Element",
        :difficult => 2
      ),
      Terrain.create!(
        :element => "Element",
        :difficult => 2
      )
    ])
  end

  it "renders a list of terrains" do
    render
    assert_select "tr>td", :text => "Element".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
