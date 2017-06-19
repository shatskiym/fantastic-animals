require 'rails_helper'

RSpec.describe "spells/new", type: :view do
  before(:each) do
    assign(:spell, Spell.new(
      :type => "",
      :characteristic => "MyString"
    ))
  end

  it "renders new spell form" do
    render

    assert_select "form[action=?][method=?]", spells_path, "post" do

      assert_select "input#spell_type[name=?]", "spell[type]"

      assert_select "input#spell_characteristic[name=?]", "spell[characteristic]"
    end
  end
end
