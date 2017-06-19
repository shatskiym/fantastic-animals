require 'rails_helper'

RSpec.describe "spells/edit", type: :view do
  before(:each) do
    @spell = assign(:spell, Spell.create!(
      :type => "",
      :characteristic => "MyString"
    ))
  end

  it "renders the edit spell form" do
    render

    assert_select "form[action=?][method=?]", spell_path(@spell), "post" do

      assert_select "input#spell_type[name=?]", "spell[type]"

      assert_select "input#spell_characteristic[name=?]", "spell[characteristic]"
    end
  end
end
