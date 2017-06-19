require 'rails_helper'

RSpec.describe "animals/new", type: :view do
  before(:each) do
    assign(:animal, Animal.new(
      :name => "MyString",
      :element => "MyString",
      :power_type => "MyString",
      :life => 1,
      :will => 1
    ))
  end

  it "renders new animal form" do
    render

    assert_select "form[action=?][method=?]", animals_path, "post" do

      assert_select "input#animal_name[name=?]", "animal[name]"

      assert_select "input#animal_element[name=?]", "animal[element]"

      assert_select "input#animal_power_type[name=?]", "animal[power_type]"

      assert_select "input#animal_life[name=?]", "animal[life]"

      assert_select "input#animal_will[name=?]", "animal[will]"
    end
  end
end
