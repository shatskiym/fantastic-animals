require 'rails_helper'

RSpec.describe "terrains/edit", type: :view do
  before(:each) do
    @terrain = assign(:terrain, Terrain.create!(
      :element => "MyString",
      :difficult => 1
    ))
  end

  it "renders the edit terrain form" do
    render

    assert_select "form[action=?][method=?]", terrain_path(@terrain), "post" do

      assert_select "input#terrain_element[name=?]", "terrain[element]"

      assert_select "input#terrain_difficult[name=?]", "terrain[difficult]"
    end
  end
end
