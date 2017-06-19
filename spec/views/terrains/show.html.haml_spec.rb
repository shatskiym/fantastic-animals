require 'rails_helper'

RSpec.describe "terrains/show", type: :view do
  before(:each) do
    @terrain = assign(:terrain, Terrain.create!(
      :element => "Element",
      :difficult => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Element/)
    expect(rendered).to match(/2/)
  end
end
